require 'fileutils'

class String
  def numeric?
    return true if self =~ /^\d+$/
    true if Float(self) rescue false
  end
end

def remove_app (app_name, app_bundle_id, device="iPhone")
  `killall "iPhone Simulator"`

  user_home = File.expand_path("~")
  sim_dir = "#{user_home}/Library/Application Support/iPhone Simulator"
  Dir.foreach(sim_dir) do |item|
    next unless item[0].numeric?
    Dir.foreach("#{sim_dir}/#{item}/Applications") do |sim_apps_folder|
      full_sim_apps_folder = "#{sim_dir}/#{item}/Applications/#{sim_apps_folder}"
      next unless File.directory?("#{full_sim_apps_folder}/#{app_name}.app")
      FileUtils.rm_rf "#{full_sim_apps_folder}"
      `/usr/libexec/PlistBuddy -c "Delete :User:#{app_bundle_id}" "#{sim_dir}/#{item}/Library/Caches/com.apple.mobile.installation~#{device}.plist"`
      `/usr/libexec/PlistBuddy -c "Save" "#{sim_dir}/#{item}/Library/Caches/com.apple.mobile.installation~#{device}.plist"`

      bundle_company_name = app_bundle_id.delete('.' + app_bundle_id.split('.').last)
      count = `/usr/libexec/PlistBuddy -c "Print :LSVendors:BundleID\\:#{bundle_company_name}:LSApplications" "#{sim_dir}/#{item}/tmp/com.apple.lsdidentifiers.plist" | grep "#{bundle_company_name}"|wc -l`
      if count.to_i == 1
        `/usr/libexec/PlistBuddy -c "Delete :LSVendors:BundleID\\:#{bundle_company_name}" "#{sim_dir}/#{item}/tmp/com.apple.lsdidentifiers.plist"`
      else
        (0..count.to_i-1).each do |i|
          one_b_id = `/usr/libexec/PlistBuddy -c "Print :LSVendors:BundleID\\:#{bundle_company_name}:LSApplications:#{i}" "#{sim_dir}/#{item}/tmp/com.apple.lsdidentifiers.plist"`
          if one_b_id == app_bundle_id
            `/usr/libexec/PlistBuddy -c "Delete :LSVendors:BundleID\\:#{bundle_company_name}:LSApplications:#{i}" "#{sim_dir}/#{item}/tmp/com.apple.lsdidentifiers.plist"`
            break
          end
        end
      end

      `/usr/libexec/PlistBuddy -c "Save" "#{sim_dir}/#{item}/tmp/com.apple.lsdidentifiers.plist"`
    end
  end
end
